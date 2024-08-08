# backend/views.py
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
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
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['date', 'periode_journee']
    ordering_fields = ['date', 'periode_journee']
    ordering = ['-date', '-periode_journee']  # Par défaut, trie du plus récent au plus ancien

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Si aucun filtre n'est appliqué, retourner toutes les tournées
        if not request.query_params:
            queryset = Tournee.objects.all().order_by('-date', '-periode_journee')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
