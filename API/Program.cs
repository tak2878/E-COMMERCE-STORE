using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

builder.Services.AddTransient<ExceptionMiddleware>();


var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000","http://localhost:3000"); 
});

// app.UseCors(policy =>
// {
//     policy.AllowAnyOrigin()
//           .AllowAnyHeader()
//           .AllowAnyMethod();
// });

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
