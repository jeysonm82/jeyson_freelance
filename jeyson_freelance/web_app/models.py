from __future__ import unicode_literals

from django.db import models
from versatileimagefield.fields import VersatileImageField, PPOIField
import json
from django.utils.html import mark_safe

# Create your models here.
class Bio(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    description = models.TextField(null=True, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=30)
    latlong = models.CharField(max_length=50)
    github_url = models.URLField("Github URL")
    linkedin_url = models.URLField("Linkedin URL")

    class Meta:
        verbose_name = 'Bio'
        verbose_name_plural = 'Bio'


class SkillCategory(models.Model):
    name = models.CharField("Name", max_length=30)
    order = models.SmallIntegerField(default = 0)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order', 'pk']
        verbose_name = 'Skill category'
        verbose_name_plural = 'Skill categories'

class Skill(models.Model):
    name = models.CharField("Name", max_length=60)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(SkillCategory, related_name='skills')

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'



class Experience(models.Model):
    title = models.CharField(max_length=70)
    date_from = models.DateField()
    date_to = models.DateField(blank=True, null=True)
    description = models.TextField()
    skills = models.ManyToManyField(Skill)
    exp_type = models.CharField("Experience type", max_length=10, choices=[('education', 'Education'), ('work', 'Work')])

    class Meta:
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'



class Project(models.Model):
    title = models.CharField(max_length=70)
    short_desc = models.CharField(max_length=140)
    image = VersatileImageField('Imagen', ppoi_field='ppoi')
    ppoi = PPOIField('Image center')
    description = models.TextField()
    demo_url = models.URLField("Demo URL", blank=True, null=True)
    source_url = models.URLField("Source URL", blank=True, null=True)
    skills = models.ManyToManyField(Skill)
    
    def to_json(self):
        r = {}
        r['title'] = self.title
        r['image'] = self.image.thumbnail['400x300'].url
        r['id'] = self.pk
        r['short_desc'] = self.short_desc
        r['skills'] = [{'name': x.name} for x in self.skills.all()]
        return mark_safe(json.dumps(r))

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
