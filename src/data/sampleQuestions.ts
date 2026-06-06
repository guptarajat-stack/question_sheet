import { Question } from '../types';
import { STRIVER_QUESTIONS } from './striverA2Z';

export const SAMPLE_QUESTIONS: Question[] = [
  // === ARRAYS (30 questions) ===
  {
    id: "arr_largest",
    title: "Largest Element in an Array",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/largest-element-in-array5009/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_second_largest",
    title: "Second Largest Element in an Array",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/second-largest3735/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_is_sorted",
    title: "Check if Array Is Sorted",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
    platform: "LeetCode"
  },
  {
    id: "arr_remove_duplicates",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    platform: "LeetCode"
  },
  {
    id: "arr_rotate_one",
    title: "Left Rotate an Array by One",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/rotate-array/",
    platform: "LeetCode"
  },
  {
    id: "arr_move_zeros",
    title: "Move Zeros to End",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/move-zeroes/",
    platform: "LeetCode"
  },
  {
    id: "arr_union",
    title: "Union of Two Sorted Arrays",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_missing",
    title: "Find Missing Number in Array",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/missing-number/",
    platform: "LeetCode"
  },
  {
    id: "arr_max_consecutive_ones",
    title: "Maximum Consecutive Ones",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/max-consecutive-ones/",
    platform: "LeetCode"
  },
  {
    id: "arr_single_number",
    title: "Single Number",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/single-number/",
    platform: "LeetCode"
  },
  {
    id: "arr_two_sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/two-sum/",
    platform: "LeetCode"
  },
  {
    id: "arr_sort_colors",
    title: "Sort Colors (Sort Array of 0s, 1s, 2s)",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/sort-colors/",
    platform: "LeetCode"
  },
  {
    id: "arr_majority_element",
    title: "Majority Element (> N/2 times)",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/majority-element/",
    platform: "LeetCode"
  },
  {
    id: "arr_kadanes",
    title: "Kadane's Algorithm (Max Subarray Sum)",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/maximum-subarray/",
    platform: "LeetCode"
  },
  {
    id: "arr_stock_buy_sell",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    platform: "LeetCode"
  },
  {
    id: "arr_rearrange_signs",
    title: "Rearrange Array Elements by Sign",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
    platform: "LeetCode"
  },
  {
    id: "arr_next_permutation",
    title: "Next Permutation",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/next-permutation/",
    platform: "LeetCode"
  },
  {
    id: "arr_leaders",
    title: "Leaders in an Array",
    difficulty: "Easy",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_longest_consecutive",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
    platform: "LeetCode"
  },
  {
    id: "arr_set_matrix_zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
    platform: "LeetCode"
  },
  {
    id: "arr_rotate_matrix",
    title: "Rotate Image (90 Degrees)",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/rotate-image/",
    platform: "LeetCode"
  },
  {
    id: "arr_spiral_matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/spiral-matrix/",
    platform: "LeetCode"
  },
  {
    id: "arr_subarray_sum_k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
    platform: "LeetCode"
  },
  {
    id: "arr_3sum",
    title: "3Sum",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/3sum/",
    platform: "LeetCode"
  },
  {
    id: "arr_4sum",
    title: "4Sum",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/4sum/",
    platform: "LeetCode"
  },
  {
    id: "arr_merge_intervals",
    title: "Merge Overlapping Subintervals",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/merge-intervals/",
    platform: "LeetCode"
  },
  {
    id: "arr_find_duplicate",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
    platform: "LeetCode"
  },
  {
    id: "arr_missing_repeating",
    title: "Repeat and Missing Number",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_inversion_count",
    title: "Inversion Count in Array",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "arr_max_product_subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    topic: "Arrays",
    problemUrl: "https://leetcode.com/problems/maximum-product-subarray/",
    platform: "LeetCode"
  },

  // === BINARY SEARCH (15 questions) ===
  {
    id: "bs_basic",
    title: "Binary Search Implementation",
    difficulty: "Easy",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/binary-search/",
    platform: "LeetCode"
  },
  {
    id: "bs_lower_bound",
    title: "Implement Lower Bound",
    difficulty: "Easy",
    topic: "Binary Search",
    problemUrl: "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bs_search_insert",
    title: "Search Insert Position",
    difficulty: "Easy",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/search-insert-position/",
    platform: "LeetCode"
  },
  {
    id: "bs_floor_ceil",
    title: "Ceil and Floor in Sorted Array",
    difficulty: "Easy",
    topic: "Binary Search",
    problemUrl: "https://www.geeksforgeeks.org/problems/ceil-the-floor2832/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bs_first_last",
    title: "First and Last Position of Element",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    platform: "LeetCode"
  },
  {
    id: "bs_search_rotated_1",
    title: "Search in Rotated Sorted Array I",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    platform: "LeetCode"
  },
  {
    id: "bs_search_rotated_2",
    title: "Search in Rotated Sorted Array II",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    platform: "LeetCode"
  },
  {
    id: "bs_find_min_rotated",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    platform: "LeetCode"
  },
  {
    id: "bs_single_element",
    title: "Single Element in a Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    platform: "LeetCode"
  },
  {
    id: "bs_peak_element",
    title: "Find Peak Element",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/find-peak-element/",
    platform: "LeetCode"
  },
  {
    id: "bs_sqrt",
    title: "Find Square Root of Integer",
    difficulty: "Easy",
    topic: "Binary Search",
    problemUrl: "https://www.geeksforgeeks.org/problems/square-root/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bs_koko",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/koko-eating-bananas/",
    platform: "LeetCode"
  },
  {
    id: "bs_aggresive_cows",
    title: "Aggressive Cows",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bs_allocate_books",
    title: "Allocate Books",
    difficulty: "Hard",
    topic: "Binary Search",
    problemUrl: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bs_matrix_2d",
    title: "Search in a 2D Matrix",
    difficulty: "Medium",
    topic: "Binary Search",
    problemUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
    platform: "LeetCode"
  },

  // === LINKED LIST (15 questions) ===
  {
    id: "ll_reverse",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/reverse-linked-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_middle",
    title: "Middle of a Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/middle-of-the-linked-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_detect_cycle",
    title: "Detect Loop/Cycle in Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/linked-list-cycle/",
    platform: "LeetCode"
  },
  {
    id: "ll_start_cycle",
    title: "Find Starting Point of Loop",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
    platform: "LeetCode"
  },
  {
    id: "ll_loop_length",
    title: "Length of Loop in Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://www.geeksforgeeks.org/problems/find-length-of-loop/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "ll_palindrome",
    title: "Check if LL is Palindrome",
    difficulty: "Easy",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/palindrome-linked-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_odd_even",
    title: "Odd Even Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/odd-even-linked-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_remove_nth",
    title: "Remove Nth Node From End",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_delete_middle",
    title: "Delete the Middle Node",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_sort",
    title: "Sort a Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/sort-list/",
    platform: "LeetCode"
  },
  {
    id: "ll_intersection",
    title: "Intersection Point of Y Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    platform: "LeetCode"
  },
  {
    id: "ll_add_one",
    title: "Add 1 to a number represented as LL",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "ll_add_two",
    title: "Add Two Numbers in Linked List",
    difficulty: "Medium",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/add-two-numbers/",
    platform: "LeetCode"
  },
  {
    id: "ll_flatten",
    title: "Flattening of a Linked List",
    difficulty: "Hard",
    topic: "Linked List",
    problemUrl: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "ll_clone",
    title: "Clone List with Random and Next Pointer",
    difficulty: "Hard",
    topic: "Linked List",
    problemUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
    platform: "LeetCode"
  },

  // === STRINGS (10 questions) ===
  {
    id: "str_outer_parens",
    title: "Remove Outermost Parentheses",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/remove-outermost-parentheses/",
    platform: "LeetCode"
  },
  {
    id: "str_reverse_words",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
    platform: "LeetCode"
  },
  {
    id: "str_largest_odd",
    title: "Largest Odd Number in String",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/largest-odd-number-in-string/",
    platform: "LeetCode"
  },
  {
    id: "str_longest_prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/longest-common-prefix/",
    platform: "LeetCode"
  },
  {
    id: "str_isomorphic",
    title: "Isomorphic Strings",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/isomorphic-strings/",
    platform: "LeetCode"
  },
  {
    id: "str_anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/valid-anagram/",
    platform: "LeetCode"
  },
  {
    id: "str_rotate",
    title: "Rotate String",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/rotate-string/",
    platform: "LeetCode"
  },
  {
    id: "str_roman_to_int",
    title: "Roman to Integer",
    difficulty: "Easy",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/roman-to-integer/",
    platform: "LeetCode"
  },
  {
    id: "str_atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/string-to-integer-atoi/",
    platform: "LeetCode"
  },
  {
    id: "str_longest_palindromic",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    problemUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    platform: "LeetCode"
  },

  // === RECURSION (8 questions) ===
  {
    id: "rec_pow",
    title: "Pow(x, n)",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/powx-n/",
    platform: "LeetCode"
  },
  {
    id: "rec_good_numbers",
    title: "Count Good Numbers",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/count-good-numbers/",
    platform: "LeetCode"
  },
  {
    id: "rec_generate_parens",
    title: "Generate Parentheses",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/generate-parentheses/",
    platform: "LeetCode"
  },
  {
    id: "rec_subset_sum_1",
    title: "Subset Sum I",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://www.geeksforgeeks.org/problems/subset-sums2234/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "rec_subset_sum_2",
    title: "Subset Sum II",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/subsets-ii/",
    platform: "LeetCode"
  },
  {
    id: "rec_comb_sum_1",
    title: "Combination Sum",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/combination-sum/",
    platform: "LeetCode"
  },
  {
    id: "rec_comb_sum_2",
    title: "Combination Sum II",
    difficulty: "Medium",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/combination-sum-ii/",
    platform: "LeetCode"
  },
  {
    id: "rec_nqueens",
    title: "N-Queens",
    difficulty: "Hard",
    topic: "Recursion",
    problemUrl: "https://leetcode.com/problems/n-queens/",
    platform: "LeetCode"
  },

  // === BIT MANIPULATION (8 questions) ===
  {
    id: "bit_power_two",
    title: "Check if Number is Power of Two",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    problemUrl: "https://leetcode.com/problems/power-of-two/",
    platform: "LeetCode"
  },
  {
    id: "bit_count_set",
    title: "Count Set Bits",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    problemUrl: "https://www.geeksforgeeks.org/problems/set-bits0143/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bit_manipulate",
    title: "Set/Clear/Toggle Bits",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    problemUrl: "https://www.geeksforgeeks.org/problems/bit-manipulation-1666686032/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bit_min_flips",
    title: "Minimum Bit Flips to Convert Number",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    problemUrl: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
    platform: "LeetCode"
  },
  {
    id: "bit_single_1",
    title: "Single Number I (Find unique element)",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    problemUrl: "https://leetcode.com/problems/single-number/",
    platform: "LeetCode"
  },
  {
    id: "bit_single_2",
    title: "Single Number II (Unique element where others appear thrice)",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    problemUrl: "https://leetcode.com/problems/single-number-ii/",
    platform: "LeetCode"
  },
  {
    id: "bit_two_odd",
    title: "Two Numbers with Odd Occurrences",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    problemUrl: "https://www.geeksforgeeks.org/problems/two-numbers-with-odd-occurrences5816/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bit_power_set",
    title: "Power Set (Generate all subsequences)",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    problemUrl: "https://www.geeksforgeeks.org/problems/power-set4302/1",
    platform: "GeeksforGeeks"
  },

  // === STACK & QUEUE (8 questions) ===
  {
    id: "sq_valid_parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/valid-parentheses/",
    platform: "LeetCode"
  },
  {
    id: "sq_min_stack",
    title: "Min Stack",
    difficulty: "Medium",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/min-stack/",
    platform: "LeetCode"
  },
  {
    id: "sq_next_greater_1",
    title: "Next Greater Element I",
    difficulty: "Medium",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/next-greater-element-i/",
    platform: "LeetCode"
  },
  {
    id: "sq_next_greater_2",
    title: "Next Greater Element II",
    difficulty: "Medium",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/next-greater-element-ii/",
    platform: "LeetCode"
  },
  {
    id: "sq_asteroid",
    title: "Asteroid Collision",
    difficulty: "Medium",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/asteroid-collision/",
    platform: "LeetCode"
  },
  {
    id: "sq_subarray_min",
    title: "Sum of Subarray Minimums",
    difficulty: "Medium",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/sum-of-subarray-minimums/",
    platform: "LeetCode"
  },
  {
    id: "sq_histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    platform: "LeetCode"
  },
  {
    id: "sq_sliding_max",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    topic: "Stack & Queue",
    problemUrl: "https://leetcode.com/problems/sliding-window-maximum/",
    platform: "LeetCode"
  },

  // === SLIDING WINDOW & TWO POINTERS (8 questions) ===
  {
    id: "sw_longest_non_repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    platform: "LeetCode"
  },
  {
    id: "sw_max_ones",
    title: "Max Consecutive Ones III",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
    platform: "LeetCode"
  },
  {
    id: "sw_fruits",
    title: "Fruit Into Baskets",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/fruit-into-baskets/",
    platform: "LeetCode"
  },
  {
    id: "sw_longest_replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    platform: "LeetCode"
  },
  {
    id: "sw_binary_subarrays",
    title: "Binary Subarrays with Sum",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/",
    platform: "LeetCode"
  },
  {
    id: "sw_nice_subarrays",
    title: "Count Number of Nice Subarrays",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/count-number-of-nice-subarrays/",
    platform: "LeetCode"
  },
  {
    id: "sw_cards",
    title: "Max Points You Can Obtain from Cards",
    difficulty: "Medium",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
    platform: "LeetCode"
  },
  {
    id: "sw_min_window",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Sliding Window & Two Pointers",
    problemUrl: "https://leetcode.com/problems/minimum-window-substring/",
    platform: "LeetCode"
  },

  // === HEAPS (8 questions) ===
  {
    id: "hp_kth_largest",
    title: "Kth Largest Element in Array",
    difficulty: "Medium",
    topic: "Heaps",
    problemUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    platform: "LeetCode"
  },
  {
    id: "hp_kth_smallest",
    title: "Kth Smallest Element in Array",
    difficulty: "Medium",
    topic: "Heaps",
    problemUrl: "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "hp_merge_lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Heaps",
    problemUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    platform: "LeetCode"
  },
  {
    id: "hp_merge_arrays",
    title: "Merge K Sorted Arrays",
    difficulty: "Medium",
    topic: "Heaps",
    problemUrl: "https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "hp_top_frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Heaps",
    problemUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
    platform: "LeetCode"
  },
  {
    id: "hp_task_scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    topic: "Heaps",
    problemUrl: "https://leetcode.com/problems/task-scheduler/",
    platform: "LeetCode"
  },
  {
    id: "hp_median_stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    topic: "Heaps",
    problemUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
    platform: "LeetCode"
  },
  {
    id: "hp_replace_rank",
    title: "Replace elements by its rank in the array",
    difficulty: "Easy",
    topic: "Heaps",
    problemUrl: "https://www.geeksforgeeks.org/problems/replace-elements-by-its-rank-in-the-array/1",
    platform: "GeeksforGeeks"
  },

  // === GREEDY ALGORITHMS (8 questions) ===
  {
    id: "gd_assign_cookies",
    title: "Assign Cookies",
    difficulty: "Easy",
    topic: "Greedy Algorithms",
    problemUrl: "https://leetcode.com/problems/assign-cookies/",
    platform: "LeetCode"
  },
  {
    id: "gd_fractional_knapsack",
    title: "Fractional Knapsack Problem",
    difficulty: "Medium",
    topic: "Greedy Algorithms",
    problemUrl: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gd_job_sequencing",
    title: "Job Sequencing Problem",
    difficulty: "Medium",
    topic: "Greedy Algorithms",
    problemUrl: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gd_n_meetings",
    title: "N Meetings in One Room",
    difficulty: "Easy",
    topic: "Greedy Algorithms",
    problemUrl: "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gd_min_platforms",
    title: "Minimum Platforms for Railway Station",
    difficulty: "Medium",
    topic: "Greedy Algorithms",
    problemUrl: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gd_candy",
    title: "Candy Distribution (LeetCode Candy)",
    difficulty: "Hard",
    topic: "Greedy Algorithms",
    problemUrl: "https://leetcode.com/problems/candy/",
    platform: "LeetCode"
  },
  {
    id: "gd_lemonade",
    title: "Lemonade Change",
    difficulty: "Easy",
    topic: "Greedy Algorithms",
    problemUrl: "https://leetcode.com/problems/lemonade-change/",
    platform: "LeetCode"
  },
  {
    id: "gd_jump_game",
    title: "Jump Game I",
    difficulty: "Medium",
    topic: "Greedy Algorithms",
    problemUrl: "https://leetcode.com/problems/jump-game/",
    platform: "LeetCode"
  },

  // === BINARY TREES & BST (15 questions) ===
  {
    id: "tree_traversals",
    title: "Binary Tree Traversals (In/Pre/Postorder)",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    platform: "LeetCode"
  },
  {
    id: "tree_height",
    title: "Height of a Binary Tree (Max Depth)",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    platform: "LeetCode"
  },
  {
    id: "tree_balanced",
    title: "Check if Binary Tree is Balanced",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/balanced-binary-tree/",
    platform: "LeetCode"
  },
  {
    id: "tree_diameter",
    title: "Diameter of a Binary Tree",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
    platform: "LeetCode"
  },
  {
    id: "tree_path_sum",
    title: "Maximum Path Sum in Binary Tree",
    difficulty: "Hard",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    platform: "LeetCode"
  },
  {
    id: "tree_same",
    title: "Same Tree",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/same-tree/",
    platform: "LeetCode"
  },
  {
    id: "tree_boundary",
    title: "Boundary Traversal of Binary Tree",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "tree_lca",
    title: "Lowest Common Ancestor (LCA)",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    platform: "LeetCode"
  },
  {
    id: "tree_children_sum",
    title: "Children Sum Property",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://www.geeksforgeeks.org/problems/children-sum-parent/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bst_search",
    title: "Search in a Binary Search Tree (BST)",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    platform: "LeetCode"
  },
  {
    id: "bst_insert",
    title: "Insert Node in a BST",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    platform: "LeetCode"
  },
  {
    id: "bst_delete",
    title: "Delete Node in a BST",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
    platform: "LeetCode"
  },
  {
    id: "bst_ceil_floor",
    title: "Ceil and Floor in a BST",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "bst_validate",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    platform: "LeetCode"
  },
  {
    id: "bst_lca",
    title: "Lowest Common Ancestor in BST",
    difficulty: "Easy",
    topic: "Binary Trees & BST",
    problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    platform: "LeetCode"
  },

  // === GRAPHS (10 questions) ===
  {
    id: "gr_bfs",
    title: "BFS Traversal of Graph",
    difficulty: "Easy",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_dfs",
    title: "DFS Traversal of Graph",
    difficulty: "Easy",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_provinces",
    title: "Number of Provinces",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://leetcode.com/problems/number-of-provinces/",
    platform: "LeetCode"
  },
  {
    id: "gr_rotten_oranges",
    title: "Rotten Oranges",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://leetcode.com/problems/rotting-oranges/",
    platform: "LeetCode"
  },
  {
    id: "gr_cycle_undirected",
    title: "Cycle Detection in Undirected Graph (BFS/DFS)",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_topo_sort",
    title: "Topological Sort (Kahn's Algorithm)",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/topological-sort/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_course_schedule",
    title: "Course Schedule I & II",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://leetcode.com/problems/course-schedule/",
    platform: "LeetCode"
  },
  {
    id: "gr_dijkstra",
    title: "Dijkstra's Algorithm (Shortest Path)",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_bellman_ford",
    title: "Bellman Ford Algorithm",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "gr_prims_mst",
    title: "Prim's Algorithm (Minimum Spanning Tree)",
    difficulty: "Medium",
    topic: "Graphs",
    problemUrl: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1",
    platform: "GeeksforGeeks"
  },

  // === DYNAMIC PROGRAMMING (12 questions) ===
  {
    id: "dp_climbing_stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/climbing-stairs/",
    platform: "LeetCode"
  },
  {
    id: "dp_frog_jump",
    title: "Frog Jump (Min Energy)",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://www.geeksforgeeks.org/problems/geek-jump/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "dp_house_robber",
    title: "House Robber I & II",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/house-robber/",
    platform: "LeetCode"
  },
  {
    id: "dp_unique_paths",
    title: "Grid Unique Paths I & II",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/unique-paths/",
    platform: "LeetCode"
  },
  {
    id: "dp_min_path_sum",
    title: "Minimum Path Sum in Grid",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/minimum-path-sum/",
    platform: "LeetCode"
  },
  {
    id: "dp_subset_sum",
    title: "Subset Sum Equal to Target",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "dp_knapsack",
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "dp_coin_change",
    title: "Coin Change I & II",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/coin-change/",
    platform: "LeetCode"
  },
  {
    id: "dp_lcs",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    platform: "LeetCode"
  },
  {
    id: "dp_edit_distance",
    title: "Edit Distance",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/edit-distance/",
    platform: "LeetCode"
  },
  {
    id: "dp_lis",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    problemUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    platform: "LeetCode"
  },
  {
    id: "dp_mcm",
    title: "Matrix Chain Multiplication",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    problemUrl: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
    platform: "GeeksforGeeks"
  },

  // === TRIES (5 questions) ===
  {
    id: "tr_implement_1",
    title: "Implement Trie I (Insert, Search, StartsWith)",
    difficulty: "Medium",
    topic: "Tries",
    problemUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    platform: "LeetCode"
  },
  {
    id: "tr_implement_2",
    title: "Implement Trie II (Count words equal/starting with)",
    difficulty: "Medium",
    topic: "Tries",
    problemUrl: "https://www.geeksforgeeks.org/problems/implement-trie-ii/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "tr_complete_string",
    title: "Complete String (Longest Word with all prefixes)",
    difficulty: "Medium",
    topic: "Tries",
    problemUrl: "https://www.naukri.com/code360/problems/complete-string_2687860",
    platform: "GeeksforGeeks"
  },
  {
    id: "tr_distinct_substrings",
    title: "Number of Distinct Substrings in a String",
    difficulty: "Medium",
    topic: "Tries",
    problemUrl: "https://www.geeksforgeeks.org/problems/number-of-distinct-substrings-in-a-string/1",
    platform: "GeeksforGeeks"
  },
  {
    id: "tr_max_xor",
    title: "Maximum XOR of Two Numbers in Array",
    difficulty: "Medium",
    topic: "Tries",
    problemUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    platform: "LeetCode"
  },
  ...STRIVER_QUESTIONS
];

export const TOPICS = [
  "Arrays",
  "Binary Search",
  "Linked List",
  "Strings",
  "Recursion",
  "Bit Manipulation",
  "Stack & Queue",
  "Sliding Window & Two Pointers",
  "Heaps",
  "Greedy Algorithms",
  "Binary Trees & BST",
  "Graphs",
  "Dynamic Programming",
  "Tries",
  "Strings Advanced"
];
export const TOPICS_DEFAULT_CONFIG = TOPICS.reduce((acc, topic) => {
  acc[topic] = true;
  return acc;
}, {} as Record<string, boolean>);
