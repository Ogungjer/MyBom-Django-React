#backendmybom/mybom/models.py

from django.db import models

class CategoriePanne(models.Model):
    panne = models.CharField(max_length=255, null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PanneVehicule(models.Model):
    vehicule = models.CharField(max_length=255)
    panne = models.CharField(max_length=255)
    jour_entree = models.DateField(null=True, blank=True)
    heure_entree = models.TimeField(null=True, blank=True)
    jour_sortie = models.DateField(null=True, blank=True)
    heure_sortie = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Radio(models.Model):
    numero = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
            return self.numero


class Conducteur(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Secteur(models.Model):
    nom = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nom

class Volume(models.Model):
    volume = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
            return self.volume

class Vehicule(models.Model):
    code_vehicule = models.CharField(max_length=255)
    volume = models.CharField(max_length=255)
    numero_radio = models.CharField(max_length=255, null=True, blank=True)
    kms_au_compteur = models.IntegerField(default=0)
    disponible = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code_vehicule

class Tournee(models.Model):
    date = models.DateField()
    code_vehicule = models.CharField(max_length=255)
    volume = models.CharField(max_length=255)
    numero_radio = models.CharField(max_length=255)
    conducteurs = models.CharField(max_length=255, null=True, blank=True)
    secteur = models.CharField(max_length=255, null=True, blank=True)
    heure_depart = models.TimeField()
    kms_depart = models.IntegerField()
    heure_arrivee = models.TimeField(null=True, blank=True)
    kms_arrivee = models.IntegerField(null=True, blank=True)
    kms_parcourus = models.IntegerField(default=0)
    temps_travail = models.TimeField(null=True, blank=True)
    vitesse_moyenne = models.FloatField()
    observations = models.TextField(null=True, blank=True)
    disponible = models.CharField(max_length=255, null=True, blank=True)
    mode_degrade = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tournee du {self.date} - {self.code_vehicule}"





