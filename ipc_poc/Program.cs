using System;
using System.IO;
using System.IO.Pipes;

namespace ipc_poc
{
    class Program
    {
        public const string NameOfPipe = "ipc_poc_pipe";
        
        static void Main(string[] args)
        {
            Console.WriteLine("Server starting...");
            var pipe = new NamedPipeServerStream(NameOfPipe, PipeDirection.InOut);
            
            Console.WriteLine("Waiting for connection...");
            pipe.WaitForConnection();
            Console.WriteLine("Connected!");
            
            using (var writer = new StreamWriter(pipe))
            {
                writer.AutoFlush = true;
                pipe.WaitForPipeDrain();
                var message = "";
                
                while (!message.Contains(":q"))
                {
                    Console.Write("Enter message to send to client (enter \":q\" to exit): ");
                    message = Console.ReadLine();
                    writer.WriteLine(message);    
                }
            }
            
            pipe.Close();
            Console.WriteLine("Server closed...");
        }
    }
}