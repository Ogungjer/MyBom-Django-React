# backendmybom/mybom/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriePanneViewSet, PanneVehiculeViewSet, RadioViewSet, ConducteurViewSet, SecteurViewSet, VolumeViewSet, VehiculeViewSet, TourneeViewSet

router = DefaultRouter()
router.register(r'categories_pannes', CategoriePanneViewSet)
router.register(r'pannes_vehicules', PanneVehiculeViewSet)
router.register(r'radios', RadioViewSet)
router.register(r'conducteurs', ConducteurViewSet)
router.register(r'secteurs', SecteurViewSet)
router.register(r'volumes', VolumeViewSet)
router.register(r'vehicules', VehiculeViewSet)
router.register(r'tournees', TourneeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
