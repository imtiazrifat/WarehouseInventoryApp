using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DIGISYSS.WEB.Startup))]
namespace DIGISYSS.WEB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
