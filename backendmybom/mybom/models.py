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
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
            return self.numero

class Role(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    password = models.CharField(max_length=255)
    remember_token = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RoleUser(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Conducteur(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Secteur(models.Model):
    nom = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
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
    disponible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code_vehicule

class Tournee(models.Model):
    date = models.DateField()
    vehicule = models.ForeignKey(Vehicule, on_delete=models.CASCADE)
    conducteurs = models.ManyToManyField(Conducteur)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE)
    heure_depart = models.TimeField()
    kms_depart = models.IntegerField()
    heure_arrivee = models.TimeField(null=True, blank=True)
    kms_arrivee = models.IntegerField(null=True, blank=True)
    kms_parcourus = models.IntegerField(default=0)
    observations = models.TextField(null=True, blank=True)
    anomalies_pannes = models.ManyToManyField(CategoriePanne, blank=True)
    disponible = models.BooleanField(default=True)
    mode_degrade = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tournée du {self.date} - {self.vehicule.code_vehicule}"





