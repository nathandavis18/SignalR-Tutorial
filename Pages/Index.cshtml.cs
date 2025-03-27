
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.Session;
using SignalR_Tutorial.Hubs;
using Microsoft.AspNetCore.Http;
using System.Runtime.Serialization.Formatters.Binary;

namespace SignalR_Tutorial.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    [BindProperty]
    public string Username { get; set; }
    public IndexModel(ILogger<IndexModel> logger)
    {
        Username = string.Empty;
        _logger = logger;
    }
    public void OnGet()
    {
    }

    public IActionResult OnPost()
    {
        int x = 3;
        return RedirectToPage("/Game/Game", new { username = Username});
    }
}
