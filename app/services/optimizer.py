class ChoiceOptimizer:
    @staticmethod
    def optimize_list(choices, ai_recommendations):
        unique_choices = []
        seen = set()
        
        for choice in choices:
            cb_id = choice.get('college_branch_id')
            if cb_id not in seen:
                seen.add(cb_id)
                unique_choices.append(choice)
                
        return {
            "optimized_list": unique_choices,
            "warnings": ["Consider adding more safe colleges."] if len(unique_choices) < 10 else []
        }
