import Route from '@ioc:Adonis/Core/Route'

const commandesRoute = () => Route.group(() => {
  Route.get('/', 'CommandesController.index')
  Route.get('/:id', 'CommandesController.show')
  Route.get('/user/:id', 'CommandesController.user')

  Route.post('/', 'CommandesController.store')
  Route.put('/:id', 'CommandesController.update')
  Route.delete('/:id', 'CommandesController.delete')
}).prefix('/commandes').middleware('auth')

export default commandesRoute
