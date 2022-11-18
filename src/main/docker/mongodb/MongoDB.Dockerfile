FROM mongo:6.0.3
ADD mongodb/scripts/init_replicaset.js init_replicaset.js
