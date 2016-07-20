from django.contrib import admin
from models import Bio, Skill, SkillCategory, Experience, Projects
# Register your models here.

class BioAdmin(admin.ModelAdmin):
    model = Bio

    def has_add_permission(self, request):
        num_objects = self.model.objects.count()
        if num_objects >= 1:
            return False
        else:
            return True

class SkillInlineAdmin(admin.TabularInline):
    model = Skill

class SkillCategoryAdmin(admin.ModelAdmin):
    inlines =  (SkillInlineAdmin,)
    model = SkillCategory

admin.site.register(Bio)
admin.site.register(Skill)
admin.site.register(SkillCategory, SkillCategoryAdmin)
admin.site.register(Experience)
admin.site.register(Projects)
