module.exports = {
  apps: [{
    name: "radio-backend",
    script: "./src/index.js",
    instances: "max",
    exec_mode: "cluster",
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 4000
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 4000
    },
    exp_backoff_restart_delay: 100,
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    error_file: "logs/error.log",
    out_file: "logs/out.log",
    time: true,
  }]
};
