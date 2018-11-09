#include "parallel.h"

namespace node {
ParallelRunner::ParallelRunner(Environment* env)
    : env_(env), uv_loop_(nullptr) {}
ParallelRunner::~ParallelRunner() {}
int ParallelRunner::Start() {
  uv_loop_ = new uv_loop_t;
  if (uv_loop_ == nullptr) {
    return UV_ENOMEM;
  }
}
template <typename Func, typename... Args>
int ParallelRunner::Enqueue(const char* syscall, Func fn, Args... args) {}

}  // namespace node
