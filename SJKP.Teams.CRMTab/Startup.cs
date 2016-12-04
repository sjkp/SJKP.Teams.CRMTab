using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.FileProviders;

namespace WebApplication1
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
           

            app.Use(async (context, next) =>
            {

                if (context.Request.Path.Value.Contains("dynamics.com"))
                {
                    var parts = context.Request.Path.Value.Split(new[] { '/' });
                    var tenant = parts.Single(s => s.Contains("dynamics.com"));
                    context.Response.Cookies.Append("crmUrl", tenant);
                    context.Request.Path = string.Join("/", parts.Where(s => s != tenant));
                }
                await next.Invoke();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
