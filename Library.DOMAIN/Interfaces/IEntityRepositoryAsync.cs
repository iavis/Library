using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN
{
    using Library.DOMAIN.Models;
    using System.Data.Entity;

    

    public interface IEntityRepositoryAsync<T> : IDisposable where T : LibraryEntity
    {
        IEnumerable<T> GetItemsAsync(); // получение всех объектов
        
        T GetItemAsync(int id); // получение одного объекта по id

        bool CreateAsync(T item); // создание объекта

        bool UpdateAsync(T item); // обновление объекта

        bool DeleteAsync(int id); // удаление объекта по id - true

        bool DeleteAsync(T item); // удаление объекта - true

        bool SaveAsync(T entity, EntityState state); // удаление объекта - 

    }
}
