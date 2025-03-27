using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SignalR_Tutorial.Pages.Game
{
    public class GameModel : PageModel
    {
        public string Username { get; set; } = string.Empty;
        public void OnGet(string username)
        {
            Username = username;
        }
    }
}
