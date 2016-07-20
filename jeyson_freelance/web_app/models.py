from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Bio(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    description = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=30)
    latlong = models.CharField(max_length=50)
    github_url = models.URLField("Github URL")
    linkedin_url = models.URLField("Linkedin URL")


class SkillCategory(models.Model):
    name = models.CharField("Name", max_length=30)
    order = models.SmallIntegerField(default = 0)

    class Meta:
        ordering = ['order']

class Skill(models.Model):
    name = models.CharField("Name", max_length=30)
    description = models.TextField()
    category = models.ForeignKey(SkillCategory)
