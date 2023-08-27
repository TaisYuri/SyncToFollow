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
    codLoja = models.CharField(max_length=5, null=False, blank=False)
    platFiscal = models.CharField(max_length= 255, null= False, blank= False)
    cadBanco = models.BooleanField(default=False, null=False, blank=False)
    cadRF = models.BooleanField(default=False,  null=False, blank=False)
    csc_acSat = models.CharField(max_length=255, null=False, blank=False)
    certDigital_atvSat = models.CharField(max_length=255, null=False, blank=False)
    impostos = models.BooleanField(default=True,  null=False, blank=False)
    check_status = models.BooleanField(default=False,  null=False, blank=False)
    steps = models.JSONField(encoder=None)
    fileCsc_acSat = models.FileField( upload_to='uploads/', blank=True)
    fileNameCsc_acSat = models.CharField(max_length=255, null=False, blank=False)
    fileCertDigital_atvSat = models.FileField(  null=True, blank=True)

class UpdateImage(models.Model):
    fileK = models.FileField(upload_to='uploads/', blank=True)

