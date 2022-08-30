import os.path
from datetime import date
from sqlite3 import IntegrityError

from django.core import serializers
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.utils.crypto import get_random_string

from putovanja.models import Korisnik, Agencija, Putovanje, Putovanja_korisnika, Zahtjevi_putovanja
from rest_framework.decorators import api_view

from django.http import FileResponse
import io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter

@api_view(['POST'])
def generisiPdf(request):
    data = request.data
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter, bottomup=0)

    textob = c.beginText()
    textob.setTextOrigin(inch, inch)
    textob.setFont("Helvetica", 14)

    lines = [
        data.get('naslov'),
        "Agencija: " + data.get('agencija'),
        "Lokacija: " + data.get('lokacija'),
        "Cijena: " + str(data.get('cijena')),
        "Datum putovanja: " + data.get('datum_putovanja'),
        "Tip putovanja: " +data.get('tip_putovanja'),
        "Prevoz: " + data.get('prevoz')

    ]

    for line in lines:
        textob.textLine(line)

    c.drawText(textob)
    c.showPage()
    c.save()
    buf.seek(0)

    return FileResponse(buf, as_attachment=True, filename='putovanje.pdf')

@api_view(['POST'])
def login(request):

    pasw = request.data.get('password')
    user = request.data.get('username')
    try:
        response = Korisnik.objects.get(username=user, password=pasw)
        print(response.id)
        return JsonResponse({'tip': 'korisnik', 'id': response.id, 'profilna_slika': str(response.profilna_slika)})
    except Korisnik.DoesNotExist:
        try:
            response2 = Agencija.objects.get(username=user, password=pasw)

            return JsonResponse({'tip': 'agencija', 'id': response2.id, 'profilna_slika': str(response2.profilna_slika)})
        except Agencija.DoesNotExist:
            return HttpResponse("Not found")

@api_view(['GET'])
def pocetna(request):
    return HttpResponse("/logo-travel.png")

@api_view(['POST'])
def registracijaKorisnika(request):
    data = request.data
    queryset = Korisnik.objects.filter(username=data.get('username')) | Korisnik.objects.filter(email=data.get('email'))
    if not queryset:
        objekat = Korisnik.objects.create(ime=data.get('ime'), prezime=data.get('prezime'), username=data.get('username'),
                                email=data.get('email'), password=data.get('password'))
        print(objekat.id)
        print(objekat)
        return JsonResponse({'ok': True, 'id': objekat.id, 'profilna_slika': 'images/profilna_default.png'})#postavit sliku
    else: return JsonResponse({'ok': False})

def test(request):
    queryset = Korisnik.objects.filter(username='kerim') | Korisnik.objects.filter(email='bla')
    print(queryset)
    if not queryset:
        return HttpResponse("Nema")
    else: return HttpResponse(queryset)


@api_view(['POST'])
def registracijaAgencije(request):
    data = request.data
    queryset = Agencija.objects.filter(username=data.get('username')) | Agencija.objects.filter(email=data.get('email'))
    if not queryset:
        objekat = Agencija.objects.create(username=data.get('username'),id_agencije=data.get('id'),
                                email=data.get('email'), password=data.get('password'),
                                datum_osnivanja=data.get('datum_osnivanja'))

        return JsonResponse({'ok': True, 'id': objekat.id, 'profilna_slika': 'images/profilna_default.png'})
    else: return JsonResponse({'ok': False})

@api_view(['POST'])
def vratiLozinku(request):
    data = request.data
    queryset = Agencija.objects.filter(email=data.get('email'))
    queryset2 = Korisnik.objects.filter(email=data.get('email'))
    if not queryset and not queryset2:
        return HttpResponse("NOT OK")
    sifra = get_random_string(10)
    send_mail('Nova lozinka', sifra, 'travel.app.react@gmail.com', [data.get('email')], fail_silently=False)
    if queryset:
        Agencija.objects.filter(email=data.get('email')).update(password=sifra)
    else: Korisnik.objects.filter(email=data.get('email')).update(password=sifra)
    return HttpResponse("OK")

@api_view(['POST'])
def dodajPutovanje(request):
    print(request.data.get('naslov'))
    data = request.data
    Putovanje.objects.create(naslov=data.get('naslov'), lokacija=data.get('lokacija'), slika=data.get('slika'),
                             kratak_opis=data.get('kratak_opis'), cijena=data.get('cijena'), datum_putovanja=data.get('datum_putovanja'),
                             tip_putovanja=data.get('tip_putovanja'),prevoz=data.get('prevoz'),
                             maks_prijava=data.get('maks_prijava'),
                             min_prijava=data.get('min_prijava'),
                             latituda=data.get('latituda'),longituda=data.get('longituda'),
                             agencija_id=data.get('agencija_id'))#izmjena trebaaaaaaaaaaaaaaaaaaaaaaaaaa
    return redirect("http://localhost:3000/dodajPutovanje")


@api_view(['GET'])
def dajSvaPutovanja(request):
    datum = date.today()
    queryset = Putovanje.objects.filter(datum_putovanja__gt = datum)
    lista = serializers.serialize('json', queryset)
    return HttpResponse(lista)

@api_view(['POST'])
def putovanje(request):
    data = request.data
    print(data)
    try:
        response = Putovanje.objects.get(pk=data.get('id'))
        agencija = Agencija.objects.get(pk=response.agencija_id)
        prijavljen = False
        prijavljeno = None
        if data.get('tip') == "korisnik":
            prijavljeno = Putovanja_korisnika.objects.filter(putovanje_id=data.get('id'), korisnik_id=data.get('id_ka'))
        if prijavljeno:
            prijavljen = True

        print(agencija.username)

        return JsonResponse({'id': response.id, 'naslov': response.naslov, 'lokacija': response.lokacija,
                             'slika': str(response.slika), 'kratak_opis': response.kratak_opis,
                             'cijena': response.cijena, 'datum_putovanja': response.datum_putovanja,
                             'tip_putovanja': response.tip_putovanja, 'prevoz': response.prevoz,
                             'maks_prijava': response.maks_prijava, 'min_prijava': response.min_prijava,
                             'latituda': response.latituda, 'longituda': response.longituda,
                             'agencija': agencija.username, 'agencija_id': agencija.id,
                             'prijavljeno': prijavljen})
    except Putovanje.DoesNotExist:
        return HttpResponse("Not found")

@api_view(['POST'])
def prijavaPutovanja(request):
    data = request.data
    Putovanja_korisnika.objects.create(status='Na čekanju', korisnik_id=data.get('korisnik_id'),
                                       putovanje_id=data.get('putovanje_id'))
    return HttpResponse("OK")


@api_view(['POST'])
def mojaPutovanja(request):
    data = request.data
    datum = date.today()
    if data.get('tip') == 'agencija':

        queryset = Putovanje.objects.filter(agencija_id=data.get('id'), datum_putovanja__lt=datum)
        if queryset:
            lista = serializers.serialize('json', queryset)
            return HttpResponse(lista)
        else: return HttpResponse("Prazna lista")
    query = Putovanje.objects.raw('select p.id, p.naslov, p.lokacija, p.slika, p.kratak_opis, p.cijena, p.datum_putovanja, p.tip_putovanja, p.prevoz from putovanja_putovanje p inner join putovanja_putovanja_korisnika pk where pk.korisnik_id = %s and p.datum_putovanja < %s and pk.status = "Odobren" and p.id = pk.putovanje_id',
                                 [data.get('id'), datum])
    lista2 = serializers.serialize('json', query)
    print(lista2)
    return HttpResponse(lista2)


@api_view(['POST'])
def planiranaPutovanja(request):

    data = request.data
    if data.get('tip') == 'korisnik':

        queryset = Putovanja_korisnika.objects.filter(korisnik_id=data.get('id')).select_related('putovanje').only('putovanje__cijena', 'putovanje__id').order_by('status')
        print(queryset.query)
        lista = []
        for e in queryset:
            print(e.putovanje.naslov)
            print(e.status)
            lista.append({'status': e.status, 'id': e.putovanje.id, 'naslov': e.putovanje.naslov,
                          'lokacija': e.putovanje.lokacija, 'slika': str(e.putovanje.slika),
                          'datum_putovanja': e.putovanje.datum_putovanja,
                          'cijena': e.putovanje.cijena})

        print(type(lista))
        queryset2 = Zahtjevi_putovanja.objects.filter(korisnik_id=data.get('id')).select_related('agencija').only('agencija__username')
        print(queryset2)
        lista2 = []
        for e in queryset2:
            lista2.append({'lokacija': e.lokacija, 'datum': e.datum, 'prevoz': e.prevoz,
                           'cijena': e.cijena, 'agencija': e.agencija.username})
        print(lista2)
        res = [lista, lista2]
        print(res)
        return JsonResponse(res, safe=False)
    else:
        datum = date.today()

        queryset = Putovanja_korisnika.objects.select_related('putovanje', 'korisnik').filter(
            putovanje__agencija_id=data.get('id')).only('putovanje__naslov', 'putovanje__cijena', 'putovanje__id',
                                                        'putovanje__slika',
                                                        'putovanje__lokacija',
                                                        'putovanje__datum_putovanja',
                                                        'korisnik__username'
                                                        )
        print(queryset.query)

        lista = []
        for e in queryset:
            lista.append({'status': e.status, 'id': e.putovanje.id, 'naslov': e.putovanje.naslov,
                          'cijena': e.putovanje.cijena,
                          'slika': str(e.putovanje.slika),
                          'lokacija': e.putovanje.lokacija,
                          'datum_putovanja': e.putovanje.datum_putovanja,
                          'korisnik_username': e.korisnik.username,
                          'id_reda': e.pk})
        datum = date.today()

        queryset2 = Putovanje.objects.filter(agencija_id=data.get('id'), datum_putovanja__gt=datum)
        if queryset2:
            lista3 = serializers.serialize('json', queryset2)

        queryset3 = Zahtjevi_putovanja.objects.filter(agencija_id=data.get('id'))
        lista4 = serializers.serialize('json', queryset3)

        lista2 = [lista, lista3, lista4]

        return JsonResponse(lista2, safe=False)


def proba(request):
    queryset = Putovanja_korisnika.objects.select_related('putovanje', 'korisnik').filter(putovanje__agencija_id=1).only('putovanje__naslov', 'putovanje__cijena', 'korisnik__username')
    print(queryset.query)

    lista = []
    for e in queryset:
        print(e.putovanje.naslov)
        print(e.status)
        lista.append({'status': e.status, 'id': e.putovanje.id, 'naslov': e.putovanje.naslov,
                      'korisnik_username': e.korisnik.username})

    return JsonResponse(lista, safe=False)


@api_view(['POST'])
def izbrisiPutovanje(request):

    Putovanje.objects.filter(pk=request.data.get('id')).delete()
    return HttpResponse("Izbrisano")


@api_view(['POST'])
def odjaviSe(request):
    data = request.data
    Putovanja_korisnika.objects.filter(putovanje_id=data.get('putovanje_id'), korisnik_id=data.get('korisnik_id')).delete()
    return HttpResponse("Odjavljeni ste!")

@api_view(['GET'])
def dajAgencije(request):
    print("EVO ME")
    queryset = Agencija.objects.all().only('id', 'username')
    lista = serializers.serialize('json', queryset)
    return HttpResponse(lista)

@api_view(['POST'])
def unesiZahtjev(request):

    if request.POST['latituda'] == '' or request.POST['latituda'] == '':
        Zahtjevi_putovanja.objects.create(lokacija=request.POST['mjesto'], datum=request.POST['datum'],
                                          prevoz=request.POST['prevoz'],
                                          cijena=request.POST['cijena'],
                                          agencija_id=request.POST['id_agencije'],
                                          korisnik_id=request.POST['id_korisnika'],
                                          korisnik_username=request.POST['korisnik_username'] )
    else:
        Zahtjevi_putovanja.objects.create(lokacija=request.POST['mjesto'], datum=request.POST['datum'],
                                          prevoz=request.POST['prevoz'],
                                          cijena=request.POST['cijena'],
                                          agencija_id=request.POST['id_agencije'],
                                          korisnik_id=request.POST['id_korisnika'],
                                          korisnik_username=request.POST['korisnik_username'],
                                          latituda=request.POST['latituda'],
                                          longituda=request.POST['longituda'])
    return redirect("http://localhost:3000/ponuda")

@api_view(['GET'])
def putovanjaPrethodniMjesec(requrst):
    queryset = Putovanje.objects.all()
    obj = serializers.serialize('json', queryset)
    return HttpResponse(obj)

@api_view(['POST'])
def postavke(request):
    data = request.data

    if data.get('tip') == 'korisnik':
        queryset = Korisnik.objects.filter(pk=data.get('id'))

        lista = serializers.serialize('json', queryset)
        return HttpResponse(lista)
    else:
        queryset = Agencija.objects.filter(pk=data.get('id'))


        lista = serializers.serialize('json', queryset)
        return HttpResponse(lista)

@api_view(['POST'])
def promijeniLozinku(request):
    data = request.data
    if data.get('tip') == 'korisnik':
        korisnik = Korisnik.objects.get(pk=data.get('id'))
        korisnik.password = data.get('password')
        korisnik.save()
        return HttpResponse("OK")
    else:
        agencija = Agencija.objects.get(pk=data.get('id'))
        agencija.password = data.get('password')
        agencija.save()
        return HttpResponse("OK")

@api_view(['POST'])
def promijeniSliku(request):
    data = request.data
    if data.get('tip') == 'korisnik':
        korisnik = Korisnik.objects.get(pk=request.POST['id'])
        if korisnik.profilna_slika != 'images/profilna_default.png':
            print("NADJENO")
            os.remove(korisnik.profilna_slika.path)
        korisnik.profilna_slika = data.get('slika')
        korisnik.save()
    else:
        agencija = Agencija.objects.get(pk=request.POST['id'])
        if agencija.profilna_slika != 'images/profilna_default.png':
            os.remove(agencija.profilna_slika.path)
        agencija.profilna_slika = data.get('slika')
        agencija.save()
    return redirect('http://localhost:3000/postavke/')

@api_view(['POST'])
def promijeniStatus(request):
    data = request.data
    putovanja_korisnika = Putovanja_korisnika.objects.get(pk=data.get('id'))
    putovanja_korisnika.status = data.get('status')
    putovanja_korisnika.save()
    return HttpResponse("OK")
