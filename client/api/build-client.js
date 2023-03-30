import axios from 'axios';

const BuildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // the server side
    // http://SERVISENAME.NAMESPASE.svc.cluster.local
    // SERVISENAME = kubectl get namespace
    //NAMESPACE = kubectl get services -n ingress-nginx
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers, // passed host and cookies!
    });
  } else {
    //the browser side
    return axios.create({
      baseURL: '/',
    });
  }
};
export default BuildClient;
