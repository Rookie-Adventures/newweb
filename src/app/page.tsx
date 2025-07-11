'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LibreChatLink from '@/components/librechat-link';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = '智能科技，引领未来';
  const typingSpeed = 150;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 英雄区 */}
      <section className="relative bg-gradient-to-r from-gray-900 to-secondary py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ShineGold AI
            <span className="block text-2xl md:text-4xl mt-2 text-primary">
              {typedText}
              <span className="animate-blink">|</span>
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            为企业和个人提供高效、智能、可靠的人工智能解决方案，助力业务增长和技术创新
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="btn-primary rounded-full px-8 py-3 font-medium text-lg"
            >
              探索产品
            </Link>
            <Link
              href="/contact"
              className="btn-secondary rounded-full px-8 py-3 font-medium text-lg"
            >
              联系我们
            </Link>
          </div>
        </div>
      </section>

      {/* 特色区域 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">我们的核心优势</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              ShineGold AI 致力于将前沿的人工智能技术转化为实用的解决方案，以满足各行各业的需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 特色卡片 1 */}
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
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">智能驱动</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                采用最新的深度学习和机器学习技术，为数据分析和决策提供智能支持
              </p>
              <Link
                href="/products#ai-models"
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

            {/* 特色卡片 2 */}
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
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">高效定制</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                根据不同行业和业务需求，提供高度定制化的AI解决方案，帮助企业提升效率
              </p>
              <Link
                href="/products#customization"
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

            {/* 特色卡片 3 */}
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
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">数据安全</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                严格的数据保护措施和安全协议，确保客户数据的隐私和安全
              </p>
              <Link
                href="/products#security"
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

      {/* 产品展示区 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">我们的产品</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              探索ShineGold AI的产品系列，满足您多样化的AI需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                    产品图片
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  GoldAssistant 智能助手
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  结合先进的自然语言处理技术，为企业和个人提供高效、智能的助手服务，可执行多种任务并提供个性化建议。
                </p>
                <Link
                  href="/products#assistant"
                  className="text-primary hover:underline flex items-center"
                >
                  查看详情
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

            <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                    产品图片
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  DataInsight 数据分析平台
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  使用AI技术分析复杂数据集，提取有价值的见解，帮助企业进行更明智的决策，优化业务流程。
                </p>
                <Link
                  href="/products#data-insight"
                  className="text-primary hover:underline flex items-center"
                >
                  查看详情
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

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
            >
              查看全部产品
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-1 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* AI对话助手区域 */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-primary/10 dark:to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                体验 <span className="text-gradient">ShineGold AI</span> 智能对话
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                我们的AI对话平台集成了多种先进的大语言模型，为您提供智能、自然、高效的对话体验。无论是日常问答、创意写作、代码辅助还是专业研究，都能轻松应对。
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg 
                    className="w-5 h-5 text-primary mt-1 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>多模型支持，满足不同场景需求</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    className="w-5 h-5 text-primary mt-1 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>支持上传文档、图片，实现多模态交互</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    className="w-5 h-5 text-primary mt-1 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>强大的知识库支持，实时获取最新信息</span>
                </li>
              </ul>
              <div>
                {/* 引入修改后的LibreChatLink组件 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <LibreChatLink 
                    variant="button" 
                    size="lg" 
                    className="bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
                  >
                    立即体验AI对话
                  </LibreChatLink>
                  <Link
                    href="/products#ai-chat"
                    className="btn-secondary rounded-full px-6 py-3 font-medium text-lg inline-flex items-center"
                  >
                    了解更多功能
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative bg-gray-800 flex items-center justify-center">
                  <div className="p-6 max-w-xl">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                        <svg 
                          className="w-6 h-6 text-primary" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">ShineGold AI 助手</h3>
                        <p className="text-gray-400">实时对话演示</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                      <p className="text-gray-300">您好！我是ShineGold AI助手，有什么我可以帮您的吗？</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 mb-4 ml-auto max-w-[80%]">
                      <p className="text-gray-300">请介绍一下人工智能在金融领域的应用</p>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-gray-300">
                        人工智能在金融领域有广泛应用，主要包括：
                        <br /><br />
                        1. <span className="text-primary">风险评估</span>：通过分析客户数据预测违约风险
                        <br />
                        2. <span className="text-primary">算法交易</span>：AI驱动的量化交易策略
                        <br />
                        3. <span className="text-primary">欺诈检测</span>：实时识别可疑交易模式
                        <br />
                        4. <span className="text-primary">智能客服</span>：24/7自动化客户支持
                        <br /><br />
                        需要了解更多具体应用吗？
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-px">
            <div className="rounded-[calc(1rem-1px)] bg-white dark:bg-secondary p-8 sm:p-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">准备开始您的AI之旅？</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                  联系我们，了解ShineGold AI如何为您提供最适合的人工智能解决方案
                </p>
                <Link
                  href="/contact"
                  className="btn-primary rounded-full px-8 py-3 font-medium inline-flex items-center"
                >
                  立即咨询
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
