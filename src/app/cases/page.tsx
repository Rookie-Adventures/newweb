import Link from 'next/link';

export default function CasesPage() {
  const caseStudies = [
    {
      id: 'fintech',
      title: '金融科技风控系统',
      category: '金融行业',
      description:
        '为国内头部金融科技公司打造智能风控系统，通过AI分析用户行为和交易数据，有效降低欺诈风险。',
      results: ['欺诈检测准确率提升35%', '人工审核工作量降低60%', '每年为客户节省约2000万运营成本'],
    },
    {
      id: 'healthcare',
      title: '医疗影像辅助诊断系统',
      category: '医疗健康',
      description: '开发基于深度学习的医疗影像分析系统，协助医生进行肺部CT影像的病变检测和分类。',
      results: ['诊断准确率达95%以上', '医生诊断效率提升40%', '平均诊断时间缩短50%'],
    },
    {
      id: 'retail',
      title: '零售业智能推荐系统',
      category: '零售行业',
      description: '为大型电商平台构建个性化推荐引擎，基于用户行为和偏好提供精准的商品推荐。',
      results: ['用户点击率提升28%', '转化率提升15%', '用户平均停留时间增加20%'],
    },
    {
      id: 'manufacturing',
      title: '工业设备预测性维护系统',
      category: '制造业',
      description:
        '为制造企业开发基于物联网和AI的设备监控和预测性维护系统，预测设备故障并提前预警。',
      results: ['设备故障率降低45%', '维护成本降低30%', '生产线停机时间减少60%'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-r from-gray-900 to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">成功案例</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            了解ShineGold AI如何帮助各行业客户解决实际问题，创造商业价值
          </p>
        </div>
      </section>

      {/* 案例列表 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                id={caseStudy.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {caseStudy.category}
                  </span>
                  <h2 className="text-3xl font-bold text-gradient mb-4">{caseStudy.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{caseStudy.description}</p>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">成果亮点：</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                      {caseStudy.results.map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/cases/${caseStudy.id}`}
                    className="btn-primary rounded-full px-6 py-2 font-medium inline-flex items-center"
                  >
                    查看详情
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
                <div
                  className={`relative h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${
                    index % 2 !== 0 ? 'lg:col-start-1' : ''
                  }`}
                >
                  <span className="text-xl font-bold text-gray-400 dark:text-gray-600">
                    案例图片
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-sm">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient mb-4">想了解更多案例？</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  联系我们，了解ShineGold AI如何为您的企业打造定制化AI解决方案
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
