from django.views.generic import TemplateView
from models import SkillCategory, Skill, Project

class HomeView(TemplateView):
    template_name = 'web_app/home.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['skills'] = SkillCategory.objects.all()
        context['sample_projects'] = list(Project.objects.all() )* 10
        return context
