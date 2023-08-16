from django.db import models

# Create your models here.
class Schedule(models.Model):
    name = models.CharField(max_length=80, null=False, blank=False)
    email = models.EmailField(max_length= 255, null= False, blank= False)
    codLoja = models.CharField(max_length=5, null=False, blank=False)
    type = models.CharField(max_length=100, null=False, blank=False)
    ticket = models.CharField(max_length=8, null=False, blank=False)
    appointmentDate = models.DateField()
    appointmentTime = models.TimeField()
    createdDate = models.DateTimeField(auto_now=True)