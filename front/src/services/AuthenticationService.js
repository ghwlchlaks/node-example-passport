import Api from '@/services/Api'

export default {
  social_login (credentials, socialName) {
    return Api().post(`/social_login/${socialName}`, credentials)
  }
}
