# backendmybom/mybom/serializers.py

from rest_framework import serializers
from .models import CategoriePanne, PanneVehicule, Radio, Conducteur, Secteur, Volume, Vehicule, Tournee

class CategoriePanneSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriePanne
        fields = '__all__'

class PanneVehiculeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanneVehicule
        fields = '__all__'

class RadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radio
        fields = '__all__'

class ConducteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conducteur
        fields = '__all__'

class SecteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secteur
        fields = '__all__'

class VolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volume
        fields = '__all__'

class VehiculeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicule
        fields = '__all__'

class TourneeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournee
        fields = '__all__'
