import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-r from-gray-900 to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">产品与服务</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            探索ShineGold的先进人工智能解决方案
          </p>
        </div>
      </section>

      {/* 产品介绍 */}
      <section id="ai-assistant" className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gradient mb-6">GoldAssistant 智能助手</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                GoldAssistant是一款基于先进大型语言模型的智能助手，能够理解自然语言，执行各种任务，并提供个性化的建议和回答。它可以帮助您：
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>处理日常事务和安排</li>
                <li>回答问题并提供专业建议</li>
                <li>协助文档编写和内容创作</li>
                <li>进行数据分析和信息整理</li>
                <li>与其他系统和工具集成，提高工作效率</li>
              </ul>
              <Link
                href="/contact"
                className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                了解详情
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-2 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                智能助手产品图片
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="data-analysis" className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                数据分析产品图片
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-6">DataInsight 数据分析平台</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                DataInsight是一个强大的AI驱动数据分析平台，能够从复杂数据中提取有价值的见解，帮助企业做出更明智的决策。其特点包括：
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>自动数据预处理和清洗</li>
                <li>高级预测分析和模式识别</li>
                <li>直观的可视化报表和仪表盘</li>
                <li>异常检测和风险评估</li>
                <li>定制化的行业解决方案</li>
              </ul>
              <Link
                href="/contact"
                className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                了解详情
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-2 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="chatbot" className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gradient mb-6">GoldChat 智能对话系统</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                GoldChat是一款先进的智能对话系统，可以为企业提供24/7不间断的客户服务，提升用户体验和客户满意度。其功能包括：
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>多语言支持和自然语言理解</li>
                <li>个性化对话和情感分析</li>
                <li>与客户关系管理系统集成</li>
                <li>自动学习和优化对话能力</li>
                <li>多渠道部署（网站、移动应用、社交媒体等）</li>
              </ul>
              <Link
                href="/contact"
                className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                了解详情
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-2 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                对话系统产品图片
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="computer-vision" className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                计算机视觉产品图片
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-6">VisionAI 计算机视觉平台</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                VisionAI是一个强大的计算机视觉平台，能够分析和理解图像和视频内容，为各行各业提供智能视觉解决方案。其应用包括：
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>对象检测和识别</li>
                <li>人脸识别和情绪分析</li>
                <li>安全监控和异常检测</li>
                <li>医疗影像分析</li>
                <li>工业质检和缺陷检测</li>
              </ul>
              <Link
                href="/contact"
                className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                了解详情
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-2 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 行业解决方案 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">行业解决方案</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              我们为不同行业提供针对性的AI解决方案，帮助企业实现数字化转型
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-secondary rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">金融行业</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                智能风控、量化交易、智能投顾、反欺诈系统等金融科技解决方案
              </p>
              <Link
                href="/industries/finance"
                className="text-primary hover:underline flex items-center"
              >
                了解更多
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-1 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-gray-50 dark:bg-secondary rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">医疗健康</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                医疗影像分析、疾病预测、智能诊疗、医疗数据管理等健康科技解决方案
              </p>
              <Link
                href="/industries/healthcare"
                className="text-primary hover:underline flex items-center"
              >
                了解更多
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-1 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-gray-50 dark:bg-secondary rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">制造业</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                智能工厂、预测性维护、质量控制、供应链优化等工业4.0解决方案
              </p>
              <Link
                href="/industries/manufacturing"
                className="text-primary hover:underline flex items-center"
              >
                了解更多
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-1 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-sm">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient mb-4">定制您的AI解决方案</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  无论您的业务需求如何，我们都能为您提供量身定制的AI解决方案。联系我们，开始您的AI之旅。
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="btn-primary rounded-full px-8 py-3 font-medium inline-flex items-center"
                >
                  联系我们
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-2 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
