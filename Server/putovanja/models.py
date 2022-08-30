from django.db import models

# Create your models here.

class Korisnik(models.Model):
    ime = models.CharField(max_length=50, null=True)
    prezime = models.CharField(max_length=50, null=True)
    username = models.CharField(max_length=50) #
    email = models.CharField(max_length=100) #
    password = models.CharField(max_length=100) #
    profilna_slika = models.ImageField(null=True, upload_to='images/', default='images/profilna_default.png')



class Agencija(models.Model):
    username = models.CharField(max_length=100)
    id_agencije = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    profilna_slika = models.ImageField(null=True, upload_to='images/', default='images/profilna_default.png')
    datum_osnivanja = models.DateField(null=True)


class Putovanje(models.Model):
    naslov = models.CharField(max_length=200, null=False)
    lokacija = models.CharField(max_length=80, null=False)
    slika = models.ImageField(null=False, upload_to='images/')
    kratak_opis = models.CharField(max_length=500, null=False)
    cijena = models.FloatField(null=False)
    datum_putovanja = models.DateField(null=False)
    tip_putovanja = models.CharField(max_length=30, null=False)
    prevoz = models.CharField(max_length=40, null=False)
    maks_prijava = models.IntegerField(null=False)
    min_prijava = models.IntegerField(null=False)
    latituda = models.FloatField(null=False)
    longituda = models.FloatField(null=False)
    agencija = models.ForeignKey(Agencija, on_delete=models.CASCADE)


class Putovanja_korisnika(models.Model):
    putovanje = models.ForeignKey(Putovanje, on_delete=models.CASCADE)
    korisnik = models.ForeignKey(Korisnik, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, null=False)


#p.id, p.naslov, p.lokacija, p.slika
#, p.kratak_opis, p.cijena, p.datum_putovanja, p.tip_putovanja, p.prevoz, p.latituda, p.longituda, pk.status

#class Zahtjevi(models.Model):
#    agencija = models.ForeignKey(Agencija, on_delete=models.CASCADE)
#    lokacija = models.CharField(max_length=70, null=False)
#    datum = models.DateField(null=False)
#    prevoz = models.CharField(max_length=30, null=False)
#    cijena = models.FloatField(null=False)


class Zahtjevi_putovanja(models.Model):
    agencija = models.ForeignKey(Agencija, on_delete=models.CASCADE)
    korisnik = models.ForeignKey(Korisnik, on_delete=models.CASCADE)
    korisnik_username = models.CharField(max_length=70, null=False)
    lokacija = models.CharField(max_length=70, null=False)
    datum = models.DateField(null=False)
    prevoz = models.CharField(max_length=30, null=False)
    cijena = models.FloatField(null=False)
    latituda = models.FloatField(null=True)
    longituda = models.FloatField(null=True)

