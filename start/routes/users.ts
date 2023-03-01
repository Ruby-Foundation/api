import Route from "@ioc:Adonis/Core/Route";

const usersRoute = () => Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')

    Route.post('/', 'UsersController.store')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.delete')
  }).prefix('/users')

  Route.group(() => {

  }).prefix('/roles')

  Route.group(() => {
    Route.get('/', 'PermissionsController.index')

    Route.get('/:id', 'PermissionsController.show')
    Route.get('/user/:id', 'PermissionsController.user')
  }).prefix('/permissions')

}).prefix('/account').middleware('auth')

export default usersRoute
