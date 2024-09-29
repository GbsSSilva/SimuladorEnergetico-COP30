# landing/views.py
from django.shortcuts import render
from rest_framework import generics
from .models import Device
from .serializers import DeviceSerializer

class DeviceListCreate(generics.ListCreateAPIView):
    queryset = Device.objects.all() 
    serializer_class = DeviceSerializer

def index(request):
    return render(request, 'index.html')
