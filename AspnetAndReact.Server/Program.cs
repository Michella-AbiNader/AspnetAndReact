using System.Linq.Expressions;

namespace AspnetAndReact.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    builder => builder
                        .WithOrigins("https://localhost:5173") // Add your frontend URL here
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.UseCors("AllowFrontend");

            app.MapFallbackToFile("/index.html");            
            
            app.Run();
        }
    }
}
