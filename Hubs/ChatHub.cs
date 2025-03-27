using Microsoft.AspNetCore.SignalR;

namespace SignalR_Tutorial.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string id)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, id);
        }

        public async Task SendDrawData(string id, int startX, int startY, int endX, int endY)
        {
            await Clients.AllExcept(id).SendAsync("ReceiveDrawData", startX, startY, endX, endY);
        }
    }
}
