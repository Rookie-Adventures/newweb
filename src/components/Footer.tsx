import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-secondary border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gradient mb-4">ShineGold AI</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              专注于提供前沿人工智能解决方案的科技企业，致力于用AI技术为客户创造更高的商业价值。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.343 14.469C7.876 14.469 7.5 14.875 7.5 15.344C7.5 15.812 7.876 16.219 8.343 16.219C8.811 16.219 9.186 15.812 9.186 15.344C9.186 14.875 8.811 14.469 8.343 14.469M11.844 10.5C12.312 10.5 12.688 10.094 12.688 9.625C12.688 9.156 12.312 8.75 11.844 8.75C11.376 8.75 11 9.156 11 9.625C11 10.094 11.376 10.5 11.844 10.5M15.344 10.5C15.811 10.5 16.187 10.094 16.187 9.625C16.187 9.156 15.811 8.75 15.344 8.75C14.876 8.75 14.5 9.156 14.5 9.625C14.5 10.094 14.876 10.5 15.344 10.5M16.656 14.469C16.188 14.469 15.812 14.875 15.812 15.344C15.812 15.812 16.188 16.219 16.656 16.219C17.124 16.219 17.5 15.812 17.5 15.344C17.5 14.875 17.124 14.469 16.656 14.469M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0M5.25 18.688C5.25 18.984 5.016 19.219 4.719 19.219C4.422 19.219 4.188 18.984 4.188 18.688V12.469C4.188 9.273 7.742 6.687 12 6.687C16.258 6.687 19.812 9.273 19.812 12.469C19.812 15.664 16.258 18.25 12 18.25C10.781 18.25 9.626 18.023 8.601 17.617L5.517 18.977C5.406 19.016 5.303 19.016 5.25 18.688" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">微博</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.82727273,16.4954545 C9.82727273,15.9559036 9.47014774,15.5090909 9.02727273,15.5090909 C8.58439772,15.5090909 8.22727273,15.9559036 8.22727273,16.4954545 C8.22727273,17.0350054 8.58439772,17.4818182 9.02727273,17.4818182 C9.47014774,17.4818182 9.82727273,17.0350054 9.82727273,16.4954545 Z M11.1818182,16.4954545 C11.1818182,15.9559036 10.8246932,15.5090909 10.3818182,15.5090909 C9.93894317,15.5090909 9.58181818,15.9559036 9.58181818,16.4954545 C9.58181818,17.0350054 9.93894317,17.4818182 10.3818182,17.4818182 C10.8246932,17.4818182 11.1818182,17.0350054 11.1818182,16.4954545 Z M12.5454545,16.4954545 C12.5454545,15.9559036 12.1883295,15.5090909 11.7454545,15.5090909 C11.3025795,15.5090909 10.9454545,15.9559036 10.9454545,16.4954545 C10.9454545,17.0350054 11.3025795,17.4818182 11.7454545,17.4818182 C12.1883295,17.4818182 12.5454545,17.0350054 12.5454545,16.4954545 Z M19.3 8.20527273 C19.2899906 8.20807273 19.2800535,8.21134091 19.2701972,8.21491364 C19.2700021,8.21511364 19.2698069,8.21511364 19.2696117,8.21531364 C19.0626328,8.27136364 18.8453716,8.2 18.7181818,8.01036364 C18.1150549,7.05090909 16.1072,1.11272727 9.30727273,1.11272727 C5.26230233,1.11272727 0.590090909,4.28136364 0.590090909,9.27272727 C0.590090909,14.9667273 6.80272727,17.7681818 12.0228374,17.7681818 C15.8940999,17.7681818 21.2502,16.0690909 21.2502,11.7054545 C21.2502,9.58181818 19.6772727,8.20527273 19.3,8.20527273 Z M6.33512644,11.7045455 C5.6245538,11.7045455 5.04545455,11.0254562 5.04545455,10.1863636 C5.04545455,9.34727104 5.6245538,8.66818182 6.33512644,8.66818182 C7.04569909,8.66818182 7.62479835,9.34727104 7.62479835,10.1863636 C7.62479835,11.0254562 7.04569909,11.7045455 6.33512644,11.7045455 Z M14.4503628,7.31818182 C14.4503628,6.47908925 15.0294522,5.8 15.8685447,5.8 C16.7076373,5.8 17.2867266,6.47908925 17.2867266,7.31818182 C17.2867266,8.15727438 16.7076373,8.83636364 15.8685447,8.83636364 C15.0294522,8.83636364 14.4503628,8.15727438 14.4503628,7.31818182 Z M22.2941176,19.4 C22.2941176,21.9396364 17.5450125,24 11.7647059,24 C5.98439925,24 1.23529412,21.9396364 1.23529412,19.4 C1.23529412,16.8603636 5.98439925,14.8 11.7647059,14.8 C17.5450125,14.8 22.2941176,16.8603636 22.2941176,19.4 Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider mb-4">
              产品服务
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products#ai-assistant"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  AI 智能助手
                </Link>
              </li>
              <li>
                <Link
                  href="/products#data-analysis"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  智能数据分析
                </Link>
              </li>
              <li>
                <Link
                  href="/products#chatbot"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  智能对话机器人
                </Link>
              </li>
              <li>
                <Link
                  href="/products#computer-vision"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  计算机视觉
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">地址：北京市海淀区中关村科技园</li>
              <li className="text-gray-600 dark:text-gray-300">电话：+86 10 8888 8888</li>
              <li className="text-gray-600 dark:text-gray-300">邮箱：contact@shinegold.ai</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            &copy; {currentYear} ShineGold AI 科技有限公司. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
