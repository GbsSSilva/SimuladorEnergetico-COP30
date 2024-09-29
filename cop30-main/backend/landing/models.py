# landing/models.py
from django.db import models

class Device(models.Model):
    nome = models.CharField(max_length=100)
    tempo_uso = models.FloatField()
    unidade_tempo = models.CharField(max_length=50)
    potencia = models.FloatField()
    quantidade = models.IntegerField()

    def __str__(self):
        return self.nome
