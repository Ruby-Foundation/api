import Route from '@ioc:Adonis/Core/Route'

const authRoute = () => Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
  }).middleware('guest')


  Route.group(() => {
    Route.delete('/logout', 'AuthController.logout')
    Route.get('/me', 'AuthController.me')
  }).middleware('auth')
}).prefix('/auth')

export default authRoute
