import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-r from-gray-900 to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">关于我们</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            了解ShineGold AI的历程、使命和愿景
          </p>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-6">公司简介</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ShineGold
                AI成立于2020年，是一家专注于人工智能技术研发与应用的高科技企业。我们的团队由来自国内外顶尖高校和科技公司的AI专家组成，致力于将前沿的人工智能技术转化为实用的解决方案，服务于各行各业。
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                自成立以来，我们已经为金融、医疗、零售、制造等多个行业的客户提供了智能化解决方案，帮助他们提升效率、降低成本、创造更大的商业价值。我们相信，人工智能技术将重塑未来世界，而ShineGold
                AI将成为这一变革的重要推动者。
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                我们始终秉持&quot;科技向善，智能共享&quot;的理念，致力于开发负责任的AI技术，让每个人都能从人工智能的发展中受益。
              </p>
            </div>
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-600">公司图片</span>
            </div>
          </div>
        </div>
      </section>

      {/* 使命与愿景 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">使命与愿景</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-secondary p-8 rounded-xl shadow-sm">
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
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">使命</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们的使命是通过人工智能技术，提供智能、高效、可靠的解决方案，帮助企业和个人释放创新潜力，推动社会进步。我们致力于降低AI技术门槛，让更多企业和个人能够便捷地使用人工智能技术，从中获益。
              </p>
            </div>

            <div className="bg-white dark:bg-secondary p-8 rounded-xl shadow-sm">
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">愿景</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们的愿景是成为全球领先的人工智能解决方案提供商，推动人工智能技术的普及和应用，为构建更智能、更高效、更美好的未来做出贡献。我们期待与各行各业携手合作，共同探索人工智能的无限可能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-4">核心价值观</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              我们的价值观引导着我们的工作方式和企业文化
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
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
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">创新</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们不断探索技术边界，积极创新，寻找更好的解决方案
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">卓越</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们追求卓越，致力于提供最高质量的产品和服务
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">合作</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们重视团队合作，相信共同努力能创造更大的价值
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-4">
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
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">责任</h3>
              <p className="text-gray-600 dark:text-gray-400">
                我们对技术发展负责，确保AI的应用符合道德和法律标准
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 加入我们 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-sm">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient mb-4">加入我们</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  我们欢迎热爱技术、充满激情的人才加入ShineGold AI团队，一起探索AI的无限可能
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="btn-primary rounded-full px-8 py-3 font-medium inline-flex items-center"
                >
                  查看职位
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
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
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
