from django.urls import path


from putovanja import views


urlpatterns = [
    path('login/', views.login, name='login'),
    path('pocetna/', views.pocetna, name='pocetna'),
    path('registracijaKorisnika/', views.registracijaKorisnika, name='registracijaKorisnika'),
    path('test/', views.test, name='test'),
    path('registracijaAgencije/', views.registracijaAgencije, name='registracijaAgencije'),
    path('vratiLozinku/', views.vratiLozinku, name='vratiLozinku'),
    path('dodajPutovanje/', views.dodajPutovanje, name='dodajPutovanje'),
    path('dajSvaPutovanja/', views.dajSvaPutovanja, name='dajSvaPutovanja'),
    path('putovanje/', views.putovanje, name='putovanje'),
    path('prijavaPutovanja/', views.prijavaPutovanja, name='prijavaPutovanja'),
    path('mojaPutovanja/', views.mojaPutovanja, name='mojaPutovanja'),
    path('planiranaPutovanja/', views.planiranaPutovanja, name='planiranaPutovanja'),
    path('proba/', views.proba, name='proba'),
    path('izbrisiPutovanje/', views.izbrisiPutovanje, name='izbrisiPutovanje'),
    path('odjaviSe/', views.odjaviSe, name='odjaviSe'),
    path('dajAgencije/', views.dajAgencije, name='dajAgencije'),
    path('unesiZahtjev/', views.unesiZahtjev, name='unesiZahtjev'),
    path('putovanjaPrethodniMjesec/', views.putovanjaPrethodniMjesec, name='putovanjaPrethodniMjesec'),
    path('postavke/', views.postavke, name='postavke'),
    path('promijeniLozinku/', views.promijeniLozinku, name='promijeniLozinku'),
    path('promijeniSliku/', views.promijeniSliku, name='promijeniSliku'),
    path('promijeniStatus/', views.promijeniStatus, name='promijeniStatus'),
    path('generisiPdf/', views.generisiPdf, name='generisiPdf')
]