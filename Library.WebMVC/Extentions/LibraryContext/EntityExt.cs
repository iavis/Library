using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.Extentions.LibraryContext
{
    
    using Library.DOMAIN.Models;
    using Library.WebMVC.ModelViews;
    
    public static class EntityExt
    {

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <typeparam name="TView"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        private static TView CreateViewInstance<TEntity, TView>(TEntity entity)
            where TEntity : LibraryEntity
            where TView : LibraryEntityView
        {
            return Activator.CreateInstance(typeof(TView), new object[] { entity }) as TView;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <typeparam name="TView"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static TView GetView<TEntity, TView>(this TEntity entity) 
            where TEntity : LibraryEntity
            where TView : LibraryEntityView
        {
            return CreateViewInstance<TEntity, TView>(entity);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <typeparam name="TView"></typeparam>
        /// <param name="entities"></param>
        /// <returns></returns>
        public static List<TView> GetViewList<TEntity, TView>(this System.Data.Entity.DbSet<TEntity> entities)
            where TEntity : LibraryEntity
            where TView : LibraryEntityView
        {
            
            return entities
                .Select(item => item)
                .ToList()
                .Select(item => CreateViewInstance<TEntity, TView>(item))
                .ToList();
        }

        public static List<TView> GetViewList<TEntity, TView>(this Library.DOMAIN.LibraryContext db)
            where TEntity : LibraryEntity
            where TView : LibraryEntityView
        {

            return db.Set<TEntity>()
                .Select(item => item)
                .ToList()
                .Select(item => CreateViewInstance<LibraryEntity, TView>(item))
                .ToList();
        }
    }
}