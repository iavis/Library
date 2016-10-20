using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {


        public interface IOne 
        {
            void GetItem();
        }

        public interface ITwo 
        {
            void GetItem();
        }


        public class OneTwo : IOne, ITwo 
        {

            void IOne.GetItem()
            {
                Console.WriteLine("IOne.GetItem");
            }

            void ITwo.GetItem()
            {
                Console.WriteLine("ITwo.GetItem");
            }

        }



        
        public static  T GetValue<T>(string key)
        {

            string vpr = "112";

            string value = vpr == null ? null : vpr;

            // проверим есть ли такой метод 
            MethodInfo m = typeof(T).GetMethod("Parse", new Type[] { typeof(string)});

            if (m != null) 
            {
                return (T)m.Invoke(null, new object[] { value });
            }
            else
            {
                return (T)Convert.ChangeType(value, typeof(T));
            }
           
            // Int32.TryParse()
            // DateTime.TryParse()

        }

        static void Main(string[] args)
        {

            OneTwo ot = new OneTwo();
            ot.
            

            

            Console.WriteLine(new string('-',50));
            Console.WriteLine(GetValue<double>("ee"));
            Console.WriteLine(GetValue<string>("ee"));
            Console.WriteLine("125");
            Console.ReadKey();
        }

    }
}
