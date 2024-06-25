from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import CategoriePanne, PanneVehicule, Radio, Conducteur, Secteur, Volume, Vehicule, Tournee
from .serializers import CategoriePanneSerializer, PanneVehiculeSerializer, RadioSerializer, ConducteurSerializer, SecteurSerializer, VolumeSerializer, VehiculeSerializer, TourneeSerializer

class CategoriePanneViewSet(viewsets.ModelViewSet):
    queryset = CategoriePanne.objects.all()
    serializer_class = CategoriePanneSerializer
    permission_classes = [IsAuthenticated]

class PanneVehiculeViewSet(viewsets.ModelViewSet):
    queryset = PanneVehicule.objects.all()
    serializer_class = PanneVehiculeSerializer
    permission_classes = [IsAuthenticated]

class RadioViewSet(viewsets.ModelViewSet):
    queryset = Radio.objects.all()
    serializer_class = RadioSerializer
    permission_classes = [IsAuthenticated]

class ConducteurViewSet(viewsets.ModelViewSet):
    queryset = Conducteur.objects.all()
    serializer_class = ConducteurSerializer
    permission_classes = [IsAuthenticated]

class SecteurViewSet(viewsets.ModelViewSet):
    queryset = Secteur.objects.all()
    serializer_class = SecteurSerializer
    permission_classes = [IsAuthenticated]

class VolumeViewSet(viewsets.ModelViewSet):
    queryset = Volume.objects.all()
    serializer_class = VolumeSerializer
    permission_classes = [IsAuthenticated]

class VehiculeViewSet(viewsets.ModelViewSet):
    queryset = Vehicule.objects.all()
    serializer_class = VehiculeSerializer
    permission_classes = [IsAuthenticated]

class TourneeViewSet(viewsets.ModelViewSet):
    queryset = Tournee.objects.all()
    serializer_class = TourneeSerializer
    permission_classes = [IsAuthenticated]
