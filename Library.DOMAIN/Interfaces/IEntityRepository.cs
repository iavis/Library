using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN
{
    using Library.DOMAIN.Models;
    using System.Data.Entity;

    

    public interface IEntityRepository<T> : IDisposable where T : LibraryEntity
    {
        IEnumerable<T> GetItems(); // получение всех объектов
        
        T GetItem(int id); // получение одного объекта по id

        bool Create(T item); // создание объекта

        bool Update(T item); // обновление объекта

        bool Delete(int id); // удаление объекта по id - true

        bool Delete(T item); // удаление объекта - true

        bool Save(T entity, EntityState state); // удаление объекта - 

    }
}
