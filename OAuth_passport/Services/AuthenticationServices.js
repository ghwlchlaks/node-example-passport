import Api from '@/services/Api'

export default {
  login (socialName) {
    return Api().get(`/login/${socialName}`)
  }
}
