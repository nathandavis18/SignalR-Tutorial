using Microsoft.AspNetCore.SignalR.Client;

namespace SignalR_Tutorial.Hubs
{
    public class Connector
    {
        private readonly HubConnection connection;
        public List<string> messages;
        public Connector()
        {
            messages = new List<string>();
            connection = new HubConnectionBuilder().WithUrl("https://localhost:7207/chatHub").Build();
            connection.On<string, string>("ReceiveMessage", (user, message) =>
            {
                var newMessage = $"{user}: {message}";
                messages.Add(newMessage);
            });
        }

        public async Task Connect()
        {
            await connection.StartAsync();
        }

        public async void SendMessage(string method, string user, string message)
        {
            await connection.StartAsync();
            await connection.InvokeAsync(method, user, message);
        }
    }
}
