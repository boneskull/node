#ifndef SRC_PARALLEL_H_
#define SRC_PARALLEL_H_

#if defined(NODE_WANT_INTERNALS) && NODE_WANT_INTERNALS

#include "node_internals.h"

namespace node {

class ParallelRunner;
class SyncParallelRunner;

class ParallelRunner {
 public:
  explicit ParallelRunner(Environment* env);
  ~ParallelRunner();
  template <typename Func, typename... Args>
  int Enqueue(const char* syscall, Func fn, Args... args);
  int Start();
  void Abort();

 private:
  inline Environment* env() const;
  Environment* env_;
  uv_loop_t* uv_loop_;
};

class SyncParallelRunner : public ParallelRunner {
  explicit SyncParallelRunner(Environment* env_);
  ~SyncParallelRunner();
};
}  // namespace node

#endif  // defined(NODE_WANT_INTERNALS) && NODE_WANT_INTERNALS

#endif  // SRC_PARALLEL_H_
