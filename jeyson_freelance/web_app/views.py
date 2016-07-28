from django.views.generic import TemplateView
from models import SkillCategory, Skill, Project, Experience, Bio

class HomeView(TemplateView):
    template_name = 'web_app/home.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['skills'] = SkillCategory.objects.all()
        context['sample_projects'] = Project.objects.all()
        context['experiences'] = list(Experience.objects.all())*5
        context['bio'] = Bio.objects.get()
        return context
