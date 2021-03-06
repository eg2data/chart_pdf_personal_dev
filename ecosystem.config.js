module.exports = {
  apps: [
    {
      name: 'chart_pdf_personal_pm2',
      script: './server-register.js',
      // interpreter_args: ["--presets", "es2015"],
      exec_interpreter: "./node_modules/.bin/babel-node", // server
      exec_mode: 'cluster', // fork, cluster mode
      instances: "1", // cluster mode only
      log_date_format  : "YYYY/MM/DD HH:mm Z",
      merge_logs: true, // cluster mode only, 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
      autorestart: true, // if process failed, restart
      watch: false, // if file has changed, restart
      // max_memory_restart: "512M", // if memory over this, restart
      env: {
        NODE_ENV: 'development',
      },
    },
  ]
};