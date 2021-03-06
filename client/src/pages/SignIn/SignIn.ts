import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'
import { Login } from '../../components/Login'
import { Signup } from '../../components/Signup'

interface IProps {}
interface IState {
  isLoginMode: boolean
}

class SignIn extends Component<IProps, IState> {
  constructor() {
    const state: IState = {
      isLoginMode: true,
    }
    super({}, state)

    Object.setPrototypeOf(this, SignIn.prototype)
    this.init()
  }

  toggleMode() {
    this.setState('isLoginMode', !this.getState('isLoginMode'))
  }
  render() {
    const isLoginMode = this.getState('isLoginMode')

    return div(
      { className: 'sign-in-container' },
      isLoginMode ? new Login() : new Signup(),
      div({
        className: 'mode-selector',
        textContent: isLoginMode ? '회원가입' : '로그인',
        onclick: () => this.toggleMode(),
      })
    )
  }
}

export default SignIn
