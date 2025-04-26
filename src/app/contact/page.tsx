'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: 'default',
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 模拟表单提交
    setSubmitStatus({
      submitted: true,
      success: true,
      message: '感谢您的信息！我们会尽快与您联系。',
    });

    // 实际应用中这里会有API调用
    // fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setSubmitStatus({
    //       submitted: true,
    //       success: true,
    //       message: "感谢您的信息！我们会尽快与您联系。"
    //     });
    //   })
    //   .catch(err => {
    //     setSubmitStatus({
    //       submitted: true,
    //       success: false,
    //       message: "提交失败，请稍后重试。"
    //     });
    //   });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-r from-gray-900 to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">联系我们</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            我们期待与您沟通，了解您的需求，为您提供最佳的AI解决方案
          </p>
        </div>
      </section>

      {/* 联系表单 */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-6">与我们取得联系</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                无论您是想了解我们的产品，寻求技术合作，还是想加入我们的团队，请填写以下表单，我们会尽快回复您。
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">地址</h3>
                    <p className="text-gray-600 dark:text-gray-400">北京市海淀区中关村科技园</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">电话</h3>
                    <p className="text-gray-600 dark:text-gray-400">+86 10 8888 8888</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">邮箱</h3>
                    <p className="text-gray-600 dark:text-gray-400">contact@shinegold.ai</p>
                  </div>
                </div>
              </div>

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
                    <path d="M9.82727273,16.4954545 C9.82727273,15.9559036 9.47014774,15.5090909 9.02727273,15.5090909 C8.58439772,15.5090909 8.22727273,15.9559036 8.22727273,16.4954545 C8.22727273,17.0350054 8.58439772,17.4818182 9.02727273,17.4818182 C9.47014774,17.4818182 9.82727273,17.0350054 9.82727273,16.4954545 Z M11.1818182,16.4954545 C11.1818182,15.9559036 10.8246932,15.5090909 10.3818182,15.5090909 C9.93894317,15.5090909 9.58181818,15.9559036 9.58181818,16.4954545 C9.58181818,17.0350054 9.93894317,17.4818182 10.3818182,17.4818182 C10.8246932,17.4818182 11.1818182,17.0350054 11.1818182,16.4954545 Z M12.5454545,16.4954545 C12.5454545,15.9559036 12.1883295,15.5090909 11.7454545,15.5090909 C11.3025795,15.5090909 10.9454545,15.9559036 10.9454545,16.4954545 C10.9454545,17.0350054 11.3025795,17.4818182 11.7454545,17.4818182 C12.1883295,17.4818182 12.5454545,17.0350054 12.5454545,16.4954545 Z M19.3 8.20527273 C19.2899906,8.20807273 19.2800535,8.21134091 19.2701972,8.21491364 C19.2700021,8.21511364 19.2698069,8.21511364 19.2696117,8.21531364 C19.0626328,8.27136364 18.8453716,8.2 18.7181818,8.01036364 C18.1150549,7.05090909 16.1072,1.11272727 9.30727273,1.11272727 C5.26230233,1.11272727 0.590090909,4.28136364 0.590090909,9.27272727 C0.590090909,14.9667273 6.80272727,17.7681818 12.0228374,17.7681818 C15.8940999,17.7681818 21.2502,16.0690909 21.2502,11.7054545 C21.2502,9.58181818 19.6772727,8.20527273 19.3,8.20527273 Z M6.33512644,11.7045455 C5.6245538,11.7045455 5.04545455,11.0254562 5.04545455,10.1863636 C5.04545455,9.34727104 5.6245538,8.66818182 6.33512644,8.66818182 C7.04569909,8.66818182 7.62479835,9.34727104 7.62479835,10.1863636 C7.62479835,11.0254562 7.04569909,11.7045455 6.33512644,11.7045455 Z M14.4503628,7.31818182 C14.4503628,6.47908925 15.0294522,5.8 15.8685447,5.8 C16.7076373,5.8 17.2867266,6.47908925 17.2867266,7.31818182 C17.2867266,8.15727438 16.7076373,8.83636364 15.8685447,8.83636364 C15.0294522,8.83636364 14.4503628,8.15727438 14.4503628,7.31818182 Z M22.2941176,19.4 C22.2941176,21.9396364 17.5450125,24 11.7647059,24 C5.98439925,24 1.23529412,21.9396364 1.23529412,19.4 C1.23529412,16.8603636 5.98439925,14.8 11.7647059,14.8 C17.5450125,14.8 22.2941176,16.8603636 22.2941176,19.4 Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-secondary rounded-xl p-8">
              {submitStatus.submitted ? (
                <div className="text-center py-8">
                  {submitStatus.success ? (
                    <>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-green-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">提交成功</h3>
                      <p className="text-gray-600 dark:text-gray-300">{submitStatus.message}</p>
                      <button
                        onClick={() => {
                          setSubmitStatus({ submitted: false, success: false, message: '' });
                          setFormData({
                            name: '',
                            email: '',
                            company: '',
                            phone: '',
                            message: '',
                            service: 'default',
                          });
                        }}
                        className="mt-6 text-primary hover:underline"
                      >
                        返回表单
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">提交失败</h3>
                      <p className="text-gray-600 dark:text-gray-300">{submitStatus.message}</p>
                      <button
                        onClick={() =>
                          setSubmitStatus({ submitted: false, success: false, message: '' })
                        }
                        className="mt-6 text-primary hover:underline"
                      >
                        重试
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        邮箱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        公司名称
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        电话号码
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      感兴趣的服务
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="default">请选择...</option>
                      <option value="ai-assistant">GoldAssistant 智能助手</option>
                      <option value="data-analysis">DataInsight 数据分析平台</option>
                      <option value="chatbot">GoldChat 智能对话系统</option>
                      <option value="computer-vision">VisionAI 计算机视觉平台</option>
                      <option value="custom">定制解决方案</option>
                      <option value="other">其他</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      留言内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary rounded-md px-6 py-3 font-medium w-full"
                  >
                    提交
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 地图 */}
      <section className="py-16 bg-gray-50 dark:bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden h-80 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-400 dark:text-gray-600">地图位置</span>
          </div>
        </div>
      </section>
    </div>
  );
}
