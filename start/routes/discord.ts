import Route from "@ioc:Adonis/Core/Route";

const discordRoute = () => Route.group(() => {
  Route.group(() => {
    Route.get('/', 'DiscordsController.index')
    Route.get('/:id', 'DiscordsController.show')

    Route.post('/', 'DiscordsController.store')
    Route.put('/:id', 'DiscordsController.update')
    Route.delete('/:id', 'DiscordsController.delete')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/', 'TicketsController.index')
    Route.get('/:id', 'TicketsController.show')
    Route.get('/user/:id', 'TicketsController.user')

    Route.post('/', 'TicketsController.store')
    Route.put('/:id', 'TicketsController.update')
    Route.delete('/:id', 'TicketsController.delete')
  }).prefix('/tickets')
}).prefix('/discord').middleware('auth')

export default discordRoute
