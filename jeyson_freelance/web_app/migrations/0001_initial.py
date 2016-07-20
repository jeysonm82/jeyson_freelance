# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-20 15:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=15)),
                ('location', models.CharField(max_length=30)),
                ('latlong', models.CharField(max_length=50)),
                ('github_url', models.URLField(verbose_name='Github URL')),
                ('linkedin_url', models.URLField(verbose_name='Linkedin URL')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SkillCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name')),
                ('order', models.SmallIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.AddField(
            model_name='skill',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web_app.SkillCategory'),
        ),
    ]
