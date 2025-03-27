using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

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
        return RedirectToPage("/Game/Game", new { username = Username});
    }
}
