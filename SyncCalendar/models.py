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

class UpdateRegister(models.Model):
    codLoja = models.CharField(max_length=5, primary_key=True)  # Definindo codLoja como chave primária
    platFiscal = models.CharField(max_length= 255, null= False, blank= False)
    cadBanco = models.BooleanField(default=False, null=False, blank=False)
    cadRF = models.BooleanField(default=False,  null=False, blank=False)
    csc_acSat = models.CharField(max_length=255)
    certDigital_atvSat = models.CharField(max_length=255)
    impostos = models.BooleanField(default=True,  null=False, blank=False)
    check_status = models.BooleanField(default=False,  null=False, blank=False)
    steps = models.JSONField(encoder=None)
   

class UpdateImage(models.Model):
    codLoja = models.ForeignKey(to= UpdateRegister, on_delete= models.CASCADE, null= False, blank= False)
    fileK = models.FileField(upload_to='uploads/', blank=True)




